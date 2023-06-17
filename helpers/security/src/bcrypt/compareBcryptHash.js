import bcrypt from 'bcrypt';

export default async (string, hashedString) => {
    if (!string) {
        throw new Error("string should not be empty");
    }

    if (!hashedString) {
        throw new Error("hashedString should not be empty");
    }

    if (Buffer.byteLength(string) > 72) {
        throw new Error("Input should contain less than 72 characters");
    }

    return await bcrypt.compare(string, hashedString);
};