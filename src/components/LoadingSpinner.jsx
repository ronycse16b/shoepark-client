export default function LoadingSpinner() {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
      </div>
    );
  }