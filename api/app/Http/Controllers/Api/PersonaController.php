<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Agente;
use App\Models\Cliente;
use App\Models\CustomUser;

class PersonaController extends Controller
{
    public function getPersona(Request $request)
    {

        $persona = CustomUser::where('id', $request->id_user)->get();

        $userType = json_decode($persona[0]);

        if ($userType->tipo === 'agente') {
            $agente = Agente::where('id_user', $request->id_user)->get();
            $info = $agente;
        } else if ($userType->tipo === 'cliente') {
            $cliente = Cliente::where('id_user', $request->id_user)->get();
            $info = $cliente;
        }

        return response()->json($info);
    }

    public function editPersona(Request $request)
    {
        $persona = CustomUser::where('id', $request->id_user)->get();

        $userType = json_decode($persona[0]);

        if ($userType->tipo === 'agente') {
            //se edita el agente
            $updated = Agente::where('id_user', $request->id_user)
                ->update([
                    'fullname' => $request->fullname,
                    'dni' => $request->dni,
                    'genero' => $request->genero,
                    'phone' => $request->phone,
                    'address' => $request->address,
                ]);
            return response()->json(['status' => 200, 'message' => 'Informacion de usuario actualizada de manera exitosa',]);
        } else if ($userType->tipo === 'cliente') {
            //se edita el cliente
            $updated = Cliente::where('id_user', $request->id_user)
                ->update([
                    'fullname' => $request->fullname,
                    'dni' => $request->dni,
                    'genero' => $request->genero,
                    'phone' => $request->phone,
                    'address' => $request->address,
                ]);
            return response()->json(['status' => 200, 'message' => 'Informacion de usuario actualizada de manera exitosa', ]);
        }
    }
}
