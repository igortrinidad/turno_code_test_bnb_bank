<?php

namespace Shared\Policies;

use Shared\Models\Statement;
use Shared\Models\User;
use Illuminate\Auth\Access\Response;

class StatementPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $user->isAdministrator()
            ? Response::allow()
            : Response::deny('You do not have permission to view this user.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Statement $statement): Response
    {
        return $user->isAdministrator() || $user->id === $statement->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to view this resource.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Statement $statement): Response
    {
        return $user->isAdministrator() || $user->id === $statement->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to create this resource.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Statement $statement): Response
    {
        return $user->isAdministrator()
            ? Response::allow()
            : Response::deny('You do not have permission to update this resource.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Statement $statement): Response
    {
        return $user->isAdministrator() || $user->id === $statement->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to delete this resource.');
    }

}
