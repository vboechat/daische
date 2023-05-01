-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "userEmail" VARCHAR(255) NOT NULL,
    "task" VARCHAR(255) NOT NULL,
    "timeStart" SMALLINT NOT NULL,
    "timeEnd" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
