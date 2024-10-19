import { Dispatch } from "react"
import type { Activity } from "../types"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
            {activities.length === 0 ? <p className="text-center mt-2">Aún no hay actividades</p> :
                activities.map(activity => (
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                                ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {activity.category === 1 ? 'Comida' : 'Ejercicio'}
                            </p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500">{activity.calories}{' '}<span>Calorías</span></p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button onClick={() => dispatch({type: 'set-activeID', payload: {id: activity.id}})}>
                                <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                            </button>
                            <button onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}>
                                <XCircleIcon className="h-8 w-8 text-red-500"/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
