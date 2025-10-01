import { User } from "../../../Domain.Endpoint/entities/user.model";

export const seedUsers: User[] = [
    {
      "id": "6a82f2e17b7be23e",
      "name": "Admin General",
      "email": "admin@empresa.com",
      "password": "$2b$10$hQG7NuzjdARFSclrKbIRx.NYwd9TDb102Qjriql3aZjBpYtVbYLVm",
      "areaId": "eedf2407cc75b66c",
      "roleId": "2d5c7f8e-1b3a-4c9d-8f0a-7e6b5a4d3c2b"
    },
    {
      "id": "6a363595011e43e2",
      "name": "Gerente Chontales",
      "email": "gerente.desarrollo@empresa.com",
      "password": "$2b$10$WjcTTjFd/vV5VIj9jMj4juhKC4i2cv5NhUEh8FstC.0EUfFHlVQJG",
      "areaId": "b90a4c28-568b-4b13-a4f6-82087a13c9e6",
      "roleId": "a3e9c8b7-4d5c-6e2f-1g8h-9i0j1k2l3m4n"
    },
    {
      "id": "7371c10282296647",
      "name": "Empleado Chontales",
      "email": "empleado.desarrollo@empresa.com",
      "password": "$2b$10$gr0fCRvjUfQpud2gPXUGpeihV3lUv5TdZSzEC8WR5MKpSag.Fzkf.",
      "areaId": "b90a4c28-568b-4b13-a4f6-82087a13c9e6",
      "roleId": "b1c2d3e4-f5g6-7h8i-9j0k-1l2m3n4o5p6q"
    },
    {
      "id": "4de9d825a5b648a2",
      "name": "Gerente Nandaime",
      "email": "gerente.qa@empresa.com",
      "password": "$2b$10$95FH36JK09VxxiSVTmzHL.vlpukym3ftbuseWCn.rqDmULFqfZbii",
      "areaId": "8a1b6a7e-4d5c-4f1a-9f23-3a8c5e6b7d41",
      "roleId": "a3e9c8b7-4d5c-6e2f-1g8h-9i0j1k2l3m4n"
    },
    {
      "id": "10b3225edd8d9ad8",
      "name": "Empleado Nandaime",
      "email": "empleado.qa@empresa.com",
      "password": "$2b$10$SyRyjAc6YR8Ldk3abisEtO60rkK1265OF7Dt/ple8F6ebcCS/aOmG",
      "areaId": "8a1b6a7e-4d5c-4f1a-9f23-3a8c5e6b7d41",
      "roleId": "b1c2d3e4-f5g6-7h8i-9j0k-1l2m3n4o5p6q"
    }
];