import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions, ActivityState } from "../reducers/activityReducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state} : FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeID){
            const selectedActivity: Activity = state.activities.filter(stateActivity => stateActivity.id === state.activeID)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeID])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'save-activity', payload: {newActivity: activity}})
        setActivity({...initialState, id: uuidv4()})
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }
    
  return (
    <form
        className="space-y-5 bg-white rounded-lg p-10 shadow"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría:</label>
            <select 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {
                    categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                }
            </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input 
                type="text" 
                id="name" 
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de naranja, Ensalada, Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}
            />
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorías:</label>
            <input 
                type="number" 
                id="calories" 
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. 100 o 500"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>
        <input 
            type="submit" 
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase cursor-pointer text-white disabled:opacity-10"
            disabled={!isValidActivity()}
        />
    </form>
  )
}
