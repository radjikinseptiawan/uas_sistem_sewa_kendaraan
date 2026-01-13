export default function SkeletonRow() {
  return (
    <tr className="border-b border-slate-200 animate-pulse">
      <td className="p-3 border border-slate-300">
        <div className="h-5 bg-slate-200 rounded w-8 mx-auto"></div>
      </td>
      
      <td className="p-3 border border-slate-300">
        <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      </td>
      
      <td className="p-3 border border-slate-300">
        <div className="h-5 bg-slate-200 rounded w-20 mx-auto"></div>
      </td>
      
      <td className="p-3 border border-slate-300">
        <div className="h-5 bg-slate-200 rounded w-24 ml-auto"></div>
      </td>
      
      <td className="p-3 border border-slate-300">
        <div className="h-5 bg-slate-200 rounded w-10 mx-auto"></div>
      </td>
      
      <td className="p-3 border border-slate-300">
        <div className="h-10 bg-blue-100 rounded-md w-full max-w-[120px] mx-auto"></div>
      </td>
    </tr>
  );
}