const env = {
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://kyc_system:khaltibetter@localhost:5432/kyc",
    NODE_ENV: process.env.NODE_ENV || "development"
}


export default env 
