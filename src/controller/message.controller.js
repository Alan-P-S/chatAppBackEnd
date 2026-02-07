import User from '../models/user.model.js';
import Message from '../models/message.model.js'
import cloudinary from '../lib/cloudinay.js';

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedUserId = req.user._id;
        const filteredUser = await User.find({_id:{$ne: loggedUserId}}).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getUserForSidebar: ",error.message);
        res.status(500).json({error:"Internal server error"}); 
    }
}


export const messages = async (req,res)=>{
    try {
        const {id:usertoChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[{senderId:myId,recieverId:usertoChatId},{senderId:usertoChatId,recieverId:myId}]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessage = async (req,res)=>{
    try{
    const {text , image } = req.body;
    const {id:recieverId} = req.params;
    const senderId = req.user._id;
   
    let imageUrl;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({senderId,recieverId,text,image:imageUrl});
    await newMessage.save();

    ///todo: socket.io for realtime functionality;
    res.status(201).json(newMessage);    
}
    catch(error){
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}