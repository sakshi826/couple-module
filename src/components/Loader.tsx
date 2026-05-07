import React from 'react';
import { IconBaseProps } from 'react-icons';
import { AiOutlineLoading, AiOutlineLoading3Quarters } from 'react-icons/ai';
import COLORS from '../misc/Colors';

const Loader: React.FC<IconBaseProps> = (props) => {
    return (
        <div className="relative inline-flex items-center justify-center">
            <AiOutlineLoading3Quarters {...props} className="animate-spin" />
            <AiOutlineLoading {...props} className="top-0 left-0 absolute opacity-20" />
        </div>
    );
};

export default Loader;
