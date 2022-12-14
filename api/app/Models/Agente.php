<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agente extends Model
{
    use HasFactory;

    protected $table = 'agente';

    protected $fillable = [
        'fullname',
        'dni',
        'genero',
        'phone',
        'correo',
        'address'
    ];
}
