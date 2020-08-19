import Permission from 'models/Permission';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission> {}

export default PermissionRepository;
