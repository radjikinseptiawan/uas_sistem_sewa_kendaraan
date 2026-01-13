interface CircleLoadingProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function CircleLoading({ 
  size = "sm", 
  color = "border-blue-500" 
}: CircleLoadingProps) {
  
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`${sizeClasses[size]} ${color} border-t-transparent animate-spin rounded-full`}
      ></div>
    </div>
  );
}