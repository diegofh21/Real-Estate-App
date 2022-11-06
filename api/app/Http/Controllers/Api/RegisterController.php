<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use App\Models\Agente;
use App\Models\Cliente;

class RegisterController extends Controller
{
    public function getUsuario(Request $request)
    {
        $usuario = DB::table('users')
            ->select('*')
            ->where('id', '=', $request->id)
            ->orWhere('username', '=', $request->username)
            ->get();

        return response()->json($usuario);
    }

    public function registrarPersona(Request $request)
    {

        $agente = new Agente();
        $cliente = new Cliente();

        if ($request->tipo === 'Agente') {
            $agente->fullname = $request->fullname;
            $agente->dni = $request->dni;
            $agente->genero = $request->genero;
            $agente->phone = $request->phone;
            $agente->address = $request->address;
            $agente->id_user = $request->id_user;
            $agente->save();

            return response()->json($agente);
        } else if ($request->tipo === 'Cliente') {
            $cliente->fullname = $request->fullname;
            $cliente->dni = $request->dni;
            $cliente->genero = $request->genero;
            $cliente->phone = $request->phone;
            $cliente->address = $request->address;
            $cliente->id_user = $request->id_user;
            $cliente->save();

            return response()->json($cliente);
        }
    }
}
