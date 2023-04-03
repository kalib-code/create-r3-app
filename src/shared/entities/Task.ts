// src/shared/Task.ts

// src/shared/Task.ts

import { Entity, Fields } from "remult"

@Entity("tasks", {
    allowApiCrud: true
})
export class Task {
    @Fields.autoIncrement()
    id = 0

    @Fields.string()
    title = ""

    @Fields.boolean()
    completed = false
}
