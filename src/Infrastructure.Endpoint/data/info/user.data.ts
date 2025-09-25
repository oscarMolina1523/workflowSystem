import { User } from "../../../Domain.Endpoint/entities/user.model";

export const seedUsers: User[] = [
    {
        id: "d4f8e5c2-1b7a-4e9f-8d2a-5b3c6e0f9a1d",
        name: "Admin General",
        email: "admin@empresa.com",
        password: "hashedpassword123", 
        areaId: "b90a4c28-568b-4b13-a4f6-82087a13c9e6", // Desarrollo
        roleId: "2d5c7f8e-1b3a-4c9d-8f0a-7e6b5a4d3c2b" // ADMIN
    },
    {
        id: "a3e9c8b7-4d5c-6e2f-1g8h-9i0j1k2l3m4n",
        name: "Gerente Desarrollo",
        email: "gerente.desarrollo@empresa.com",
        password: "hashedpassword456",
        areaId: "b90a4c28-568b-4b13-a4f6-82087a13c9e6", // Desarrollo
        roleId: "a3e9c8b7-4d5c-6e2f-1g8h-9i0j1k2l3m4n" // MANAGER
    },
    {
        id: "b1c2d3e4-f5g6-7h8i-9j0k-1l2m3n4o5p6q",
        name: "Empleado Desarrollo",
        email: "empleado.desarrollo@empresa.com",
        password: "hashedpassword789",
        areaId: "b90a4c28-568b-4b13-a4f6-82087a13c9e6", // Desarrollo
        roleId: "b1c2d3e4-f5g6-7h8i-9j0k-1l2m3n4o5p6q" // DEVELOPER
    },
    {
        id: "c7d8e9f0-1g2h-3i4j-5k6l-7m8n9o0p1q2r",
        name: "Gerente QA",
        email: "gerente.qa@empresa.com",
        password: "hashedpassword101",
        areaId: "8a1b6a7e-4d5c-4f1a-9f23-3a8c5e6b7d41", // QA
        roleId: "a3e9c8b7-4d5c-6e2f-1g8h-9i0j1k2l3m4n" // MANAGER
    },
    {
        id: "d9e8f7g6-5h4i-3j2k-1l0m-9n8o7p6q5r4s",
        name: "Empleado QA",
        email: "empleado.qa@empresa.com",
        password: "hashedpassword112",
        areaId: "8a1b6a7e-4d5c-4f1a-9f23-3a8c5e6b7d41", // QA
        roleId: "c7d8e9f0-1g2h-3i4j-5k6l-7m8n9o0p1q2r" // QA
    }
];