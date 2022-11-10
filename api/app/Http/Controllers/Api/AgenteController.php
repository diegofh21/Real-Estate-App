<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Propiedades;

class AgenteController extends BaseController
{
    public function postImg(Request $request)
    {
        if ($request->hasFile('image')) {

            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . $filename;

            $request->file('image')->storeAs('images/', $finalName, 'public');

            $inmueble = new Propiedades();

            $inmueble->titulo = null;
            $inmueble->ubicacion = null;
            $inmueble->descripcion = null;
            $inmueble->precio = null;
            $inmueble->tipo = null;
            $inmueble->bathroom = null;
            $inmueble->habitaciones = null;
            $inmueble->estacionamientos = null;
            $inmueble->estado = null;
            $inmueble->id_agente = null;
            $inmueble->photo = 'http://localhost:8000/storage/images/' . '_' . $finalName;

            $inmueble->save();

            return response()->json(["message" => "Successfully upload an image"]);
        } else {
            return response()->json(["message" => "You must select an image"]);
        }
    }

    public function PublicarInmueble(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Required for posting properties
            'titulo' => 'required',
            'ubicacion' => 'required',
            'descripcion' => 'required',
            'precio' => 'required',
            'tipo' => 'required',
            'bathroom' => 'required',
            'habitaciones' => 'required',
            'estacionamientos' => 'required',
            'estado' => 'required',
            'id_agente' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        } else {

            $inmueble = new Propiedades();

            $lastInsertedID = DB::table('propiedad')->latest('id_propiedad')->first();

            $updated = Propiedades::where('id_propiedad', $lastInsertedID->id_propiedad)
                ->update([
                    'titulo' => $request->titulo,
                    'ubicacion' => $request->ubicacion,
                    'descripcion' => $request->descripcion,
                    'precio' => $request->precio,
                    'tipo' => $request->tipo,
                    'bathroom' => $request->bathroom,
                    'habitaciones' => $request->habitaciones,
                    'estacionamientos' => $request->estacionamientos,
                    'estado' => $request->estado,
                    'id_agente' => $request->id_agente
                ]);

            return response()->json(["status" => 200, "message" => "Propiedad registrada exitosamente"]);

            // $inmueble->titulo = $request->titulo;
            // $inmueble->ubicacion = $request->ubicacion;
            // $inmueble->descripcion = $request->descripcion;
            // $inmueble->precio = $request->precio;
            // $inmueble->tipo = $request->tipo;
            // $inmueble->bathroom = $request->bathroom;
            // $inmueble->habitaciones = $request->habitaciones;
            // $inmueble->estacionamientos = $request->estacionamientos;
            // $inmueble->estado = $request->estado;
            // $inmueble->id_agente = $request->id_agente;

            // $inmueble->save();

        }
    }

    public function getInmueblesPublicados(Request $request) {
        $countInmuebles = DB::table('propiedad')
        ->select(DB::raw('count(id_propiedad) as InmueblesPublicados'))
        ->where('id_agente', '=', $request->id_agente)
        ->get();

        return response()->json($countInmuebles);
    }
}
