import postgres from 'postgres'

const connectionString = "postgresql://postgres:Qitech@quant01@db.jjhpvlzosuzhfgfhgkia.supabase.co:5432/postgres"
const sql = postgres(connectionString)

export default sql