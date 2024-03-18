<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('statements', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->references('id')->on('users')->onDelete('cascade')->index();
            $table->integer('verified_by_user_id')->references('id')->on('users')->onDelete('SET NULL')->index()->nullable();
            $table->string('description');
            $table->integer('value');
            $table->string('type')->default('purchase');
            $table->string('status')->default('pending');
            $table->text('reject_reason')->nullable();
            $table->string('file_path', 1000)->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statements');
    }
};
