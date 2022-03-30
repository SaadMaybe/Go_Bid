let gobid

export default class GobidDAO 
{
    static async injectDB(conn)
    {
        if(gobid)
        {
            return
        }

        try
        {
            gobid = await conn.db(process.env.GOBID_NS).collection("gobid")
        }
        catch
        {

        }
    }
}