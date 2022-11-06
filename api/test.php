<?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

// SE REPITE PARA TARJETA DE DEBITO Y CREDITO
$fecha = $faker->creditCardExpirationDateString();
echo 'FECHA '. $fecha;
echo " CVV ". $faker->numberBetween(1, 999);
$tipo = $faker->creditCardType();
echo " numero de tarjeta ". $faker->creditCardNumber($tipo, true, '-');
echo " tipo ".$tipo;

echo " --------- ";
// NUMERO DE CUENTA DEL BANCO
echo $faker->numberBetween(11111111111111111111, 11999999999999999999);
echo $faker->randomElement(['Corriente', 'Ahorro']);

// echo $faker->creditCardDetails(true);