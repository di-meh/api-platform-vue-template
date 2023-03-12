<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;

class UserFixtures extends Fixture {
    public function load(ObjectManager $manager): void {
        $admin = new User();
        $admin->setEmail('admin@example.com');
        $admin->setPassword('admin'); // admin
        $admin->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);

        $user = new User();
        $user->setEmail('user@example.com');
        $user->setPassword('user'); // user
        $user->setRoles(['ROLE_USER']);
        $manager->persist($user);

        $manager->flush();
    }
}
