<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'user'])->default('user')->after('name');
            $table->decimal('balance', 18, 2)->default(0)->after('role');
            $table->string('phone')->nullable()->after('balance');
            $table->text('address')->nullable()->after('phone');
            $table->date('date_of_birth')->nullable()->after('address');
            $table->string('employment_status')->nullable()->after('date_of_birth');
            $table->string('occupation')->nullable()->after('employment_status');
            $table->string('source_of_funds')->nullable()->after('occupation');
            $table->boolean('pep_status')->default(false)->after('source_of_funds');
            $table->string('tax_id')->nullable()->after('pep_status');
            $table->boolean('is_verified')->default(false)->after('tax_id');
            $table->string('avatar')->nullable()->after('is_verified');
            $table->string('member_id')->unique()->nullable()->after('avatar');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role', 'balance', 'phone', 'address', 'date_of_birth',
                'employment_status', 'occupation', 'source_of_funds',
                'pep_status', 'tax_id', 'is_verified', 'avatar', 'member_id',
            ]);
        });
    }
};
