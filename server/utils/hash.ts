import bcrypt from 'bcrypt';

const hashString = async (text: string) => {
    const saltRounds = 10; 
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
};

const verifyString = async (text: string, hash: string) => {
    return await bcrypt.compare(text, hash);
};

export { hashString, verifyString };