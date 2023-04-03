// src/shared/Task.ts

// src/shared/Task.ts

import { Entity, Fields, Allow } from "remult"

@Entity("blogs", {
    allowApiCrud: Allow.authenticated,
})
export class Blog {
    @Fields.cuid()
    id = ""

    @Fields.string()
    title = ""

    @Fields.string()
    content = ""

    @Fields.string()
    published = ""

    @Fields.createdAt()
    createdAt = new Date()
}
