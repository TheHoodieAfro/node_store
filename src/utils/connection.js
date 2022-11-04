import mongoose from "mongoose";
import debug from "debug";

const debuglog = debug('app')

async function connect() {
    const dburi = process.env.DBURL || ''

    try {
        await mongoose.connect(dburi)
        debuglog('Connected')
    } catch (error) {
        debuglog('Could not connect to DB: ' + process.env.BDURL)
        debuglog(error)

        process.exit(1)
    }
}

export default connect