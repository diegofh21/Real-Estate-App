<?php

namespace App\Filters\V1;

use App\Filters\ApiFilter;
use Illuminate\Http\Request;

class InmueblesFilter extends ApiFilter
{

    protected $safeParms = [
        'id_propiedad' => ['eq'],
        'titulo' => ['eq'],
        'ubicacion' => ['eq'],
        'descripcion' => ['eq'],
        'precio' => ['eq', 'lt', 'lte', 'gt', 'gte'],
        'tipo' => ['eq'],
        'bathroom' => ['eq', 'lt', 'lte', 'gt', 'gte'],
        'habitaciones' => ['eq', 'lt', 'lte', 'gt', 'gte'],
        'estacionamientos' => ['eq', 'lt', 'lte', 'gt', 'gte'],
        'estado' => ['eq'],
        'photo' => ['eq'],
        'id_agente' => ['eq'],
    ];

    protected $columnMap = [];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];
}
