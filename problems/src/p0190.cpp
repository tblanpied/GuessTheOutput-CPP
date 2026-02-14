struct T {};

struct S {
    void m() {}
};

int main() {
    S x(T());
    x.m();
}
