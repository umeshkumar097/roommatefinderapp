import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // In prod, use env var!

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};

export const signToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const getDataFromToken = async (request: any) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        if (!token) {
            // Check header as fallback
            const authHeader = request.headers.get('Authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1];
                const decoded: any = jwt.verify(token, JWT_SECRET);
                return decoded;
            }
            return null;
        }
        const decoded: any = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error: any) {
        return null;
    }
}
