import { Html } from '@react-three/drei';

const Loader = () => {
    return (
        <Html center>
            <div className="flex flex-col justify-center items-center">
                <div className="w-16 h-16 border-4 border-opacity-25 border-blue-500 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-white text-sm">Loading...</p>
            </div>
        </Html>
    );
};

export default Loader;