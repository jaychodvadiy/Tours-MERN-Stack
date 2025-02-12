import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};

export const register = async (req, res, next) => {
  const { UserName, email, passwod } = req.body;

  try {
    const user = await UserName.findOne({ UserName });

    if (user) {
      return res.status(400).json({
        success: false,
        messes: "UserName already exists. Use diffrent",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashepassword = await bcrypt.hash(passwod.salt);

    user = new UserName({
      UserName,
      email,
      passwod: hashepassword,
    });
    await user.save();
    return status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, messes: "server error" });
  }
};

export const login = async (req, res, next) => {

    const {email}=req.body;

    try {
        const user = await User.findOne({email:user}); 

        if(!user){
            return res.status(400).json({success:false, messes:"Indvalid credentails"});
        }
        const isPasswordMatch = await bcrypt.compare(req.body.passwod, user.passwod);

        if(!isPasswordMatch){
            return res.status(400).json({success:false, messes:"Indvadlid credentails"});
        }
        
        const token = generateToken(user);
        const {password, role, ...rest} = user._doc;
        return res.status(200).json({success:true, messes:"User looged in successfully", token, data:{...rest},role});
    } catch (error) {
        
    }
};
