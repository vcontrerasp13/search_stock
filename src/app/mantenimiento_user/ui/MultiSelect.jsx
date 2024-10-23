'use client';
import React, { useState } from 'react';

const MultiSelect = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (option) => {
        setSelectedOptions((prev) => {
            if (prev.includes(option)) {
                return prev.filter((o) => o !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Selecciona Opciones</span>
            </label>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <div key={option} className="form-control">
                        <label className="cursor-pointer label">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => toggleOption(option)}
                            />
                            <span className="label-text">{option}</span>
                        </label>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <span className="font-bold">Opciones Seleccionadas:</span>
                <ul className="list-disc ml-5">
                    {selectedOptions.map((selected) => (
                        <li key={selected}>{selected}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MultiSelect;
