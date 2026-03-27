const supabase = require('../config/supabase');

const TABLE = 'users';

const UserModel = {
  // Buscar todos os usuários (sem senha_hash)
  async findAll({ page = 1, limit = 20, tipo, ativo } = {}) {
    let query = supabase
      .from(TABLE)
      .select('id, nome, email, tipo, ativo')
      .order('id', { ascending: true });

    if (tipo !== undefined) query = query.eq('tipo', tipo);
    if (ativo !== undefined) query = query.eq('ativo', ativo);

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, error, count } = await query;
    return { data, error, count };
  },

  // Buscar por ID
  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('id, nome, email, tipo, ativo')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Buscar por email (inclui senha_hash para autenticação)
  async findByEmail(email) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('email', email)
      .single();
    return { data, error };
  },

  // Criar usuário
  async create({ nome, email, senha_hash, tipo, ativo = true }) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([{ nome, email, senha_hash, tipo, ativo }])
      .select('id, nome, email, tipo, ativo')
      .single();
    return { data, error };
  },

  // Atualizar usuário
  async update(id, fields) {
    // Nunca atualizar id diretamente
    delete fields.id;

    const { data, error } = await supabase
      .from(TABLE)
      .update(fields)
      .eq('id', id)
      .select('id, nome, email, tipo, ativo')
      .single();
    return { data, error };
  },

  // Deletar usuário
  async delete(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id)
      .select('id')
      .single();
    return { data, error };
  },

  // Verificar se email já existe (excluindo um id específico)
  async emailExists(email, excludeId = null) {
    let query = supabase
      .from(TABLE)
      .select('id')
      .eq('email', email);

    if (excludeId) query = query.neq('id', excludeId);

    const { data, error } = await query.maybeSingle();
    return { exists: !!data, error };
  },
};

module.exports = UserModel;
