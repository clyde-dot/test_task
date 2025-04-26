import { Router } from "express"

import appealRouter from "./appeal.router"

const router = Router()

router.use("/appeal", appealRouter)

export default router
