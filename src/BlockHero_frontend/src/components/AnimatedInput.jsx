import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative"
        initial={false}
        animate={isFocused ? "focused" : "unfocused"}
      >
        <motion.input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full px-4 py-3 bg-white/10 backdrop-blur-sm
            border-2 border-white/20 rounded-xl
            text-gray-800 placeholder-gray-500
            focus:outline-none focus:border-purple-500/50
            transition-all duration-300
          "
          variants={{
            focused: { scale: 1.02 },
            unfocused: { scale: 1 }
          }}
          {...props}
        />
        {label && (
          <motion.label
            className="
              absolute left-4 text-gray-600 pointer-events-none
              transition-all duration-300
            "
            variants={{
              focused: { 
                y: -32, 
                scale: 0.85, 
                color: '#8B5CF6' 
              },
              unfocused: { 
                y: value ? -32 : 12, 
                scale: value ? 0.85 : 1,
                color: '#6B7280'
              }
            }}
          >
            {label}
          </motion.label>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedInput;