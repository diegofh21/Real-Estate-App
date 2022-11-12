<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Propiedades;

use App\Http\Resources\InmueblesCollection;
use App\Http\Resources\InmueblesResource;
use App\Filters\V1\InmueblesFilter;

class AgenteController extends BaseController
{
    public function postImg(Request $request)
    {
        if ($request->hasFile('image')) {

            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . '_' . $filename;

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
            $inmueble->photo = 'http://localhost:8000/storage/images/' . $finalName;

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
        }
    }

    public function getInmueblesPublicados(Request $request)
    {
        $inmuebles = Propiedades::where('id_agente', $request->id_agente)
            ->get();

        $inmueblesFav = Propiedades::where('id_propiedad', $request->id_propiedad)
            ->get();

        $countInmuebles = DB::table('propiedad')
            ->select(DB::raw('count(id_propiedad) as InmueblesPublicados'))
            ->where('id_agente', '=', $request->id_agente)
            ->get();

        return response()->json([
            'inmuebles' => $inmuebles,
            'countInmueble' => $countInmuebles,
            'inmueblesFav' => $inmueblesFav
        ]);
    }

    public function updateInmueble(Request $request)
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
            'estado' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        } else {

            $updated = Propiedades::where('id_propiedad', $request->id_propiedad)
                ->update([
                    'titulo' => $request->titulo,
                    'ubicacion' => $request->ubicacion,
                    'descripcion' => $request->descripcion,
                    'precio' => $request->precio,
                    'tipo' => $request->tipo,
                    'bathroom' => $request->bathroom,
                    'habitaciones' => $request->habitaciones,
                    'estacionamientos' => $request->estacionamientos,
                    'estado' => $request->estado
                ]);

            return response()->json(["status" => 200, "message" => "Propiedad actualizada exitosamente"]);
        }
    }

    public function deleteInmueble(Request $request)
    {
        $deleted = Propiedades::where('id_propiedad', $request->id_propiedad)->delete();

        return response()->json(["status" => 200, "message" => "Propiedad eliminada exitosamente"]);
    }

    public function getAllInmuebles(Request $request)
    {
        $filter = new InmueblesFilter();
        $filterItems = $filter->transform($request);

        $inmuebles = Propiedades::where($filterItems)->orderByDesc('created_at');

        return new InmueblesCollection($inmuebles->paginate(50)->appends($request->query()));
    }

    public function busquedaInmuebles(Request $request)
    {
        $inmuebles = '';

        $validator = Validator::make($request->all(), [
            // Required for login
            'ubicacion' => 'required',
            'bathroom' => 'required',
            'habitaciones' => 'required',
            'estacionamientos' => 'required',
            'tipo' => 'required',
            'estado' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $inmuebles = Propiedades::select('*')
            ->where('ubicacion', 'LIKE', '%' . $request->location . '%')
            ->orWhere('bathroom', '>=', $request->bathroom)
            ->orWhere('habitaciones', '>=', $request->habitaciones)
            ->orWhere('estacionamientos', '>=', $request->estacionamientos)
            ->orWhere('tipo', '>=', $request->tipo)
            ->orWhere('estado', '>=', $request->estado)
            ->take(1)
            ->get();

        return response()->json($inmuebles);
    }
}
