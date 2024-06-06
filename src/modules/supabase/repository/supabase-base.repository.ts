import { PostgrestError } from '@supabase/supabase-js';
import { Supabase } from '../client/supabase';
import {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../database.types';
import { IBaseRepository } from './base-repository/base-repository.interface';
import { DataAccessException } from './exceptions/repository-exception/data-access.exception';

type FilterStringKeys<T extends PropertyKey> = T extends string ? T : never;

interface IWithError {
  error: PostgrestError;
}

export class SupabaseBaseRepository<
  Tb extends keyof Database['public']['Tables'],
  PkArrt extends FilterStringKeys<keyof Tables<Tb>>,
  Entity extends Tables<Tb> = Tables<Tb>,
  Pk = Tables<Tb>[PkArrt],
> implements
    IBaseRepository<
      {
        entity: Tables<Tb>;
        create: TablesInsert<Tb>;
        update: TablesUpdate<Tb>;
      },
      Pk
    >
{
  constructor(
    private readonly _table: Tb,
    private readonly _primaryKey: PkArrt,
    protected readonly _supabase: Supabase,
  ) {}

  async findById(id: Pk): Promise<Entity> {
    const result = await this._supabase
      .getClient()
      .from(this._table)
      .select()
      .eq(this._primaryKey, id)
      .maybeSingle();

    this.assertIsSuccess(result);
    return result.data as Entity;
  }

  async create(options: TablesInsert<Tb>): Promise<Entity> {
    const result = await this._supabase
      .getClient()
      .from(this._table)
      .insert(options)
      .select()
      .maybeSingle();
    this.assertIsSuccess(result);

    return result.data as Entity;
  }

  async update(id: Pk, options: TablesUpdate<Tb>): Promise<Entity> {
    const result = await this._supabase
      .getClient()
      .from(this._table)
      .update(options)
      .eq(this._primaryKey, id)
      .select()
      .maybeSingle();
    this.assertIsSuccess(result);
    return result.data as Entity;
  }

  async delete(id: Pk) {
    const result = await this._supabase
      .getClient()
      .from(this._table)
      .delete()
      .eq(this._primaryKey, id)
      .maybeSingle();

    this.assertIsSuccess(result);
  }

  protected assertIsSuccess(result: IWithError) {
    if (result.error) {
      throw new DataAccessException(result.error.message);
    }
  }
}
