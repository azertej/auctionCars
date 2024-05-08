import React from 'react'

const Filters = ({ showFilters, setShowfilters, filters, setFilters }) => {
    const models = [
        {
            name: 'BMW',
            value: 'BMW'
        },
        {
            name: 'Clio',
            value: 'CLIO'
        },
        {
            name: 'MERCEDEC',
            value: 'MERCEDEC'
        },
        {
            name: 'Ford',
            value: 'FORD'
        },
        {
            name: 'Volkswagen',
            value: 'VOLKSWAGEN'
        },
        {
            name: 'Toyota',
            value: 'TOYOTA'
        },
        {
            name: 'Renault',
            value: 'RENAULT'
        },
    ]
    const ages = [
        {
            name: '0-2 Y-O',
            value: '0-2'
        },
        {
            name: '3-6 Y-O',
            value: '3-6'
        },
        {
            name: '7-10 Y-O',
            value: '7-10'
        },
        {
            name: '11+ Y-O',
            value: '12-25'
        },
    ]
    return (
        <div>
            <div className='flex items-center justify-between w-60 mt-1 mr-3 '>
                <h1 className='text-2xl text-red-800'>Filters</h1>
                <i class="ri-close-fill cursor-pointer text-2xl" onClick={() => setShowfilters(!showFilters)}></i>
            </div>
            <div className='flex flex-col gap-1 mt-5'>
                <h3 className='text-2sm text-blue-900'>Categories</h3>
                {models.map((model) => {
                    return (
                        <div className='flex items-center gap-2'>
                            <input type='checkbox'
                                className='max-width cursor-pointer'
                                name='model'
                                checked={filters.model.includes(model.value)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFilters({
                                            ...filters, model: [...filters.model, model.value]
                                        })
                                    }
                                    else {
                                        setFilters({
                                            ...filters, model: filters.model.filter((item) => item !== model.value)
                                        })
                                    }
                                }} />
                            <label htmlFor='model' >{model.name}</label>
                        </div>
                    )
                })}
                <h3 className='text-2sm text-blue-900'>Age</h3>
                {ages.map((age) => {
                    return (
                        <div className='flex items-center gap-1'>
                            <input type='checkbox'
                                className='max-width cursor-pointer '
                                name='age'
                                checked={filters.age.includes(age.value)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFilters({
                                            ...filters, age: [...filters.age, age.value]
                                        })
                                    }
                                    else {
                                        setFilters({
                                            ...filters, age: filters.age.filter((item) => item !== age.value)
                                        })
                                    }
                                }}
                            />
                            <label htmlFor='age' >{age.name}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Filters