import dayjs from "dayjs"
import {
  Appeal,
  AppealStatus,
  Prisma,
  PrismaClient,
} from "../../generated/prisma"

import { Request, Response } from "express"

class AppealService {
  private prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }

  private async filters(req: Request): Promise<{
    where: Prisma.AppealWhereInput
    skip: number
    take: number
    orderBy: Record<string, "asc" | "desc">
    total: number
    page: number
    limit: number
    totalPages: number
  }> {
    const filtersQuery = req.query as {
      date?: string
      startDate?: string
      endDate?: string
      status?: AppealStatus
      order?: "asc" | "desc"
      sort?: string
      limit?: string
      page?: string
    }

    const where: Prisma.AppealWhereInput = {}
    const orderBy: Record<string, "asc" | "desc"> = {}
    const sortField = filtersQuery.sort || "createdAt"
    const sortOrder: "asc" | "desc" =
      filtersQuery.order === "asc" ? "asc" : "desc"
    orderBy[sortField] = sortOrder

    if (filtersQuery.date || (filtersQuery.startDate && filtersQuery.endDate)) {
      const start = filtersQuery.date
        ? dayjs(filtersQuery.date).startOf("day")
        : dayjs(filtersQuery.startDate).startOf("day")

      const end = filtersQuery.date
        ? dayjs(filtersQuery.date).endOf("day")
        : dayjs(filtersQuery.endDate).endOf("day")

      if (!start.isValid() || !end.isValid()) {
        throw new Error("Некорректный формат даты")
      }

      where.createdAt = { gte: start.toDate(), lte: end.toDate() }
    }

    if (filtersQuery.status) {
      where.status = filtersQuery.status
    }

    const total = await this.prisma.appeal.count({ where })
    const take = parseInt(filtersQuery.limit || "10", 10)
    const totalPages = Math.max(Math.ceil(total / take), 1)
    const currentPage = Math.min(
      parseInt(filtersQuery.page || "1", 10),
      totalPages
    )
    const skip = Math.max((currentPage - 1) * take, 0)

    return {
      where,
      skip,
      take,
      orderBy,
      total,
      page: currentPage,
      limit: take,
      totalPages,
    }
  }

  async create({
    title,
    description,
  }: Prisma.AppealCreateInput): Promise<Appeal> {
    const appeal = await this.prisma.appeal.create({
      data: {
        title,
        description,
      },
    })
    return appeal
  }

  async getAll(
    req: Request,
    res: Response
  ): Promise<{
    data: Appeal[]
    meta: { total: number; page: number; limit: number; totalPages: number }
  }> {
    const { total, page, limit, totalPages, ...filters } = await this.filters(req)
    const appeals = await this.prisma.appeal.findMany(filters)
    return {
      data: appeals,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    }
  }

  async getById(id: string): Promise<Appeal | null> {
    const appeal = await this.prisma.appeal.findUnique({
      where: {
        id,
      },
    })
    return appeal
  }

  async updateStatus(
    id: string,
    {
      status,
      solutionProblem,
      cancelReason,
    }: {
      status: AppealStatus
      solutionProblem?: string | null
      cancelReason?: string | null
    }
  ): Promise<Appeal> {
    let data = {}
    if (solutionProblem) data = { ...data, solutionProblem }
    if (cancelReason) data = { ...data, cancelReason }

    const appeal = await this.prisma.appeal.update({
      where: {
        id,
      },
      data: {
        ...data,
        status: AppealStatus[status],
      },
    })
    return appeal
  }

  async cancelAllProgress(cancelReason?: string | null): Promise<boolean> {
    const appeals = await this.prisma.appeal.updateMany({
      where: {
        status: AppealStatus.IN_PROGRESS,
      },
      data: {
        status: AppealStatus.CANCELLED,
        cancelReason: cancelReason || null,
      },
    })

    if (appeals.count === 0) {
      return false
    }

    return true
  }
}

export default new AppealService()
