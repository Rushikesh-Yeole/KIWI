import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE } from '../config/emailTemplates.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Return the token in the response body
        return res.json({ success: true, token, message: "Registration successful" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email & password are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return the token in the response body
        return res.json({ success: true, token, message: 'Login successful' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        // Inform the client to remove the token
        return res.json({ success: true, message: "Logged out" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp)
        };
        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: `OTP sent` });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Incorrect Credentials" });
    }
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: `User not found ` });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: `Invalid OTP` });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: `OTP Expired` });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: `Email Verified Successfully!` });

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
};

export const isAuthenticated = async (req, res) => {
    try {
        // Assuming token validation is already handled in middleware
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
