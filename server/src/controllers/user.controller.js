import UserModel from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user?.id || req.userId; 

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User ID not found in request."
            });
        }

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        console.error("Get Current User Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching user profile."
        });
    }
};
