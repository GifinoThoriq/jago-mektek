const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center opacity-100 transition-opacity transform translate-y-0">
      <div className="fixed inset-0 bg-white"></div>
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-blue-light rounded-full"></div>
        <div className="w-8 h-8 bg-blue-light rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-light rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
