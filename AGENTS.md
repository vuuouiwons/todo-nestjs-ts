# AGENTS.md — NestJS Architecture & Coding Conventions

## Project Overview
This codebase enforces **NestJS Modular Architecture** with clean layer separation (Presentation -> Business Logic -> Data Access) within feature modules. All generated, refactored, or reviewed code must adhere to NestJS module conventions, dependency injection patterns, and OpenAPI specifications.

---

## Directory Structure
Code is organized into feature-based NestJS modules and shared common utilities:

```text
src/
├── auth/               # Authentication module (JWT, login, register, guards)
│   ├── dto/            # Auth request & response DTOs
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.swagger.ts # Swagger/OpenAPI decorator definitions
│   └── auth.module.ts
├── user/               # User domain module
│   ├── entities/       # User TypeORM entity & schemas
│   ├── user.service.ts
│   └── user.module.ts
├── todolist/           # Todolist feature module
│   ├── dto/            # Request & response DTOs, query filters
│   ├── entities/       # Todolist TypeORM entity
│   ├── todolist.controller.ts
│   ├── todolist.service.ts
│   ├── todolist.swagger.ts # Swagger/OpenAPI decorator definitions
│   └── todolist.module.ts
├── todo/               # Todo feature module
│   ├── dto/            # Request & response DTOs, query filters
│   ├── entities/       # Todo TypeORM entity
│   ├── todo.controller.ts
│   ├── todo.service.ts
│   ├── todo.swagger.ts # Swagger/OpenAPI decorator definitions
│   └── todo.module.ts
├── common/             # Cross-cutting concerns & shared utilities
│   ├── decorators/     # Custom parameter decorators (e.g., @CurrentUser)
│   ├── dto/            # Shared DTOs (Pagination, BulkDelete, ErrorResponse)
│   ├── filters/        # Global exception filters (HttpExceptionFilter for OpenAPI error format)
│   └── guards/         # Security guards (e.g., JwtAuthGuard)
├── config/             # Application configuration loader and YAML files
├── email/              # BullMQ queue processors and email handling
├── health/             # Health check endpoints
├── app.module.ts       # Root module assembling all feature modules
└── main.ts             # Application entrypoint & global configuration

test/
├── unit/               # All unit test files (*.spec.ts) separated from business logic
└── e2e/                # End-to-end test suites
```

---

## Strict Architectural & Dependency Rules
1. **NestJS Modular Boundaries:** Each feature is encapsulated in a dedicated NestJS Module (`@Module()`). Feature modules export services or models that other modules need to consume via NestJS Dependency Injection.
2. **Layer Separation within Modules:**
   - **Controllers (Presentation):** Handle routing, validate requests via `ValidationPipe` and class-validator DTOs, provide OpenAPI/Swagger annotations, and delegate work to Services. Keep controller methods thin.
   - **Services (Business Logic):** Execute domain rules, multi-step operations, permission/ownership checks (e.g., `userId` validation), and data manipulation. Throw appropriate NestJS `HttpException`s (`NotFoundException`, `ConflictException`, `BadRequestException`, `UnauthorizedException`).
   - **Entities / Repositories (Data Access):** TypeORM entities decorated with `@Entity()`, `@PrimaryGeneratedColumn()`, `@Column()`, and relationship decorators (`@ManyToOne()`, `@OneToMany()`), managed via TypeORM `Repository<T>`.
3. **OpenAPI Specification Compliance:**
   - All response and request formats must strictly comply with `openapi.json`.
   - Error responses must conform to `{ error: string }`, handled via `HttpExceptionFilter`.
   - Route versioning and prefixes are configured globally via `app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })` and `app.setGlobalPrefix('api', ...)`.
4. **Authentication & Authorization:**
   - Protected endpoints must use `@UseGuards(JwtAuthGuard)` and `@ApiBearerAuth('BearerAuth')`.
   - The authenticated user is extracted via `@CurrentUser('id') userId: number` or `@CurrentUser() user`.
   - Resources must always be scoped to the authenticated user's `userId`.

---

## Layer-Specific Coding Conventions

### 1. Controllers (`*.controller.ts`)
* Decorate with `@ApiTags(...)`, `@Controller(...)`, and Swagger metadata (`@ApiOperation`, `@ApiResponse`, `@ApiBody`, `@ApiParam`).
* Use strongly typed DTOs with `class-validator` and `class-transformer` decorators.
* Inject Services via constructor injection.
* **Forbidden:** Direct database operations, ORM calls, or business logic.

### 2. Services (`*.service.ts`)
* Mark as `@Injectable()`.
* Inject TypeORM repositories using `@InjectRepository(Entity)`.
* Enforce domain constraints, scoping queries with `userId`.
* **Forbidden:** Direct manipulation of raw HTTP request/response objects (`req`, `res`).

### 3. Entities (`entities/*.entity.ts`)
* Define table schemas using TypeORM decorators (`@Entity`, `@PrimaryGeneratedColumn`, `@Column`, `@CreateDateColumn`, `@UpdateDateColumn`, `@DeleteDateColumn`).
* Use `@DeleteDateColumn` where soft deletion is required.

---

## Agent Verification Checklist
Before finalizing any code changes, verify the following:
- [ ] Does code build without errors (`nest build`)?
- [ ] Are all routes and schemas matching `openapi.json`?
- [ ] Are error responses standardized to `{ error: string }`?
- [ ] Are all queries scoped to `userId` for data isolation?
- [ ] Are dependencies injected via NestJS modules rather than direct instantiation?
