import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';
import { userModel, contentModel , LinkModel} from "./db";
import { Middleware}  from './Middleware';
import connection from './connention';
import { z } from "zod";

import { random } from './utils';
import cors from 'cors';

require('dotenv').config();
const port = 3000;


const app = express();
app.use(cors());
app.use(express.json());

function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

const signupSchema = z.object({
    username: z
      .string()
      .min(3 , "Username must be at least 3 characters")
      .max(15, "Username must be less than 15 characters")
      .nonempty("Username is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be less than 6 characters")
      .nonempty("Password is required"),
  });

app.post('/api/v1/signup', async (req: Request, res: Response) => {

    try {
        const validatedData = signupSchema.parse(req.body);
        const { username, email, password } = validatedData;

        const validatepassword = validatePassword(password);
        if(!validatepassword){
          res.json({
            message: "Enter Strong password",
          })
          return;
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.create({
            username,
            email,
            password:hashedPassword
        });

        // Send a success response with user details (exclude password)
        res.status(201).json({
            message: "Signup success",

        });

    } catch (error: any) {

        // Handle validation errors
        if (error instanceof z.ZodError) {
           res.status(400).json({
            message: "Validation error",
            errors: error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
            });
        }

        if (error?.code === 11000) { // Optional chaining ensures `code` is safely accessed
            res.status(409).json({
                message: "User already exists",
            });
        } else {
            res.status(500).json({
                message: "Error creating user",
                error: error.message || error, // Safely include error details
            });
        }
    }
});

app.post("/api/v1/signin", async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request body using Zod
      const { email, password } = req.body;

      // Check if the user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(404).json({
          message: "User does not exist",
        });
        return; // Exit after sending a response
      }

      // Compare provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          message: "Invalid email or password",
        });
        return; // Exit after sending a response
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET as string,

      );

      // Successful login
      console.log(token);
      res.status(200).json({

        token,

      });
    } catch (error: any) {

      res.status(500).json({
        message: "Server error",
        error: error.message || "An unexpected error occurred",
      });
    }
  });

app.post('/api/v1/content' ,Middleware , async (req: Request, res: Response): Promise<void> =>{
   try{
    const {title , link , type} = req.body;
    await contentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })

    res.json({
        message:'content added'
    })
   }

   catch(error){
    res.json({
        message:error
    })
   }
})

app.get('/api/v1/content' ,Middleware , async (req: Request, res: Response): Promise<void> =>{
  try{
    //@ts-ignore
    const userId = req.userId;
    const allContent = await contentModel.find({
        userId:userId
    }).populate('userId' , 'username')

    res.json({
        allContent
    })
  }

  catch(error){
   res.json({
       message:error
   })
  }
})



app.delete('/api/v1/delete/:contentId'  , async (req: Request, res: Response): Promise<void> =>{
  try{
    //@ts-ignore
    const { contentId } = req.params;
    const deletedContent = await contentModel.findByIdAndDelete(contentId);


    res.json({
        deletedContent
    })
  }

  catch(error){
   res.json({
       message:error
   })
  }
})

app.get('/api/v1/search' , async (req: Request, res: Response): Promise<void> =>{
  //@ts-ignore
  // const userId = "67489191694b0387b203947c" ;
  const filter = req.query?.filter || ""; // Assuming filter is coming from the request body


  try{

    const users = await contentModel.find({
        $or: [
            {
                title: {
                    "$regex": filter,
                    "$options": "i"
                }
            }


        ]
      })
      //@ts-ignore
      // const auser = users.filter((e) => e._id.toString() === userId);
      res.status(200).send({
        user: users.map((user) => ({
            title: user.title,
            link: user.link,
            type: user.type,
            _id: user._id
        }))
    });
  }catch(e){
    res.send({
      message:"not found"
    })
  }
})

// import { Request, Response } from 'express';
// import { LinkModel } from '../models/Link';
// import { ContentModel } from '../models/Content';
// import { UserModel } from '../models/User';
// import { random } from '../utils/random';

// Types
interface ShareRequest extends Request {
    userId?: string;  // Added by middleware
    body: {
        share?: boolean;
    };
}

interface LinkDocument {
    userId: string;
    hash: string;
}

interface UserDocument {
    _id: string;
    username: string;
}

// Share/Unshare endpoint
const handleShare = async (req: ShareRequest, res: Response) => {
    const { share } = req.body;

    if (typeof share === 'undefined') {
        return res.status(400).json({
            error: "Missing 'share' field in request body."
        });
    }

    //@ts-ignore
    const userId = req.body.userId;  // User ID is now passed explicitly in the body

    if (!userId) {
        return res.status(400).json({
            error: "User ID is required."
        });
    }

    try {
        if (share) {
            // Handle share creation
            const existingLink = await LinkModel.findOne({ userId }) as LinkDocument | null;

            if (existingLink) {
                return res.status(200).json({
                    hash: existingLink.hash
                });
            }

            const hash = random(10);
            await LinkModel.create({
                userId,
                hash,
            });

            return res.status(201).json({
                message: "Shareable link created successfully.",
                hash,
            });
        }

        // Handle share deletion
        const deletedLink = await LinkModel.deleteOne({ userId });

        if (deletedLink.deletedCount === 0) {
            return res.status(404).json({
                message: "No link found to delete."
            });
        }

        return res.status(200).json({
            message: "Link deleted successfully."
        });

    } catch (error) {
        console.error('Share operation failed:', error);
        return res.status(500).json({
            error: "An unexpected error occurred."
        });
    }
};


// Get shared content endpoint
 const getSharedContent = async (req: Request, res: Response) => {
    const { shareLink: hash } = req.params;

    try {
        const link = await LinkModel.findOne({ hash }) as LinkDocument | null;

        if (!link) {
            return res.status(404).json({
                message: "Invalid share link."
            });
        }

        const [content, user] = await Promise.all([
            contentModel.find({ userId: link.userId }),
            userModel.findOne({ _id: link.userId }) as Promise<UserDocument | null>
        ]);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.json({
            username: user.username,
            content
        });

    } catch (error) {
        console.error('Failed to fetch shared content:', error);
        return res.status(500).json({
            error: "An unexpected error occurred while fetching shared content."
        });
    }
};

// Route setup
//@ts-ignore
app.post("/api/v1/share", handleShare);
//@ts-ignore
app.get("/api/v1/:shareLink", getSharedContent);


app.listen(port, () => {
    connection()
  console.log(`Server running at http://localhost:${port}`);
});
