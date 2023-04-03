// src/shared/Task.ts

// src/shared/Task.ts

import { Entity, Fields } from "remult"

@Entity("blogs", {
    allowApiCrud: true
})
export class Blog {
    @Fields.cuid()
    id = ""

    @Fields.string()
    title = ""

    @Fields.string()
    content = ""

    @Fields.boolean()
    published = false

    @Fields.createdAt()
    createdAt = new Date()
}