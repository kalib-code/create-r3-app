
import { Entity, Fields, Allow, remult } from "remult"

@Entity("blogs", {
    allowApiCrud: Allow.authenticated,
    apiPrefilter: async () => remult.isAllowed() ? {} : { user_id: remult.user?.id },
    saving: async (b) => {
        b.user_id = remult.user!.id
    }
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

    @Fields.string()
    user_id = ""
}
