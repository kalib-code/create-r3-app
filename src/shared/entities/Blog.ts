
import { Entity, Fields, Allow, remult } from "remult"

@Entity("blogs", {
    allowApiCrud: true,
    // apiPrefilter: async () => remult.isAllowed() ? {} : { user_id: remult.user?.id },
    // saving: async (b) => {
    //     b.user_id = remult.user!.id
    // }
})
export class Blog {
    @Fields.cuid()
    id = ""

    @Fields.string()
    title = ""

    @Fields.string()
    content = ""

    @Fields.string()
    status = ""

    @Fields.createdAt()
    createdAt = new Date()
}
