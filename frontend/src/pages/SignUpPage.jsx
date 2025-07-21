import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import {Link} from "react-router-dom";
import { toast } from 'react-hot-toast';
import AuthImagePattern from "../components/AuthImagePattern"
const SignupPage=()=>{
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        password:'',
    });
    const {signup,isSigningUp} = useAuthStore();
    const validateForm = () => {
        if(!formData.fullName.trim()) 
            return toast.error("Full name is required");
        
        if(!formData.email.trim()) 
            return toast.error("Email is required");    
        if(!/\S+@\S+\.\S+/.test(formData.email)) 
            return toast.error("Please enter a valid email address");   
        if(!formData.password.trim()) 
            return toast.error("Password is required");         
        if(formData.password.length < 6)
            return toast.error("Password must be at least 6 characters long");

        return true;
    }
    const handleSubmit = (e)=>{e.preventDefault()
        const success = validateForm();
        if(success===true) signup(formData);
    }
    return(
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center  p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <MessageSquare className="size-6 text-primary"/>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                    </div>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    className={`input input-bordered w-full pl-10`}
                                    required/>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                    </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className={`input input-bordered w-full pl-10`}
                                    required/>
                            </div>
                        </div>
                         <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                    </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="........"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className={`input input-bordered w-full pl-10`}
                                    />
                                    <button type="button" className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff className='size-5 text-base-content/40'/> : <Eye className='size-5 text-base-content/40'/>}
                                    </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full" disabled={isSigningUp}>{isSigningUp ? (<>
                                <Loader2 className="size-4 animate-spin" />
                                Loading...</>) : ('Create Account')}
                            </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account? {" "}<Link to="/login" className="link link-primary">Sign in</Link>
                        </p>
                        </div>
                </div>

                </div>
                <AuthImagePattern title="Join our community"
                subtitle="Connect with friends,share moments, and stay in touch with you"/>
        </div>
    )
}
export default SignupPage;