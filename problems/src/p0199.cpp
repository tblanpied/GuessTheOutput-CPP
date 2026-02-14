struct S {
    explicit S(int) {}
};

void f(S) {}

int main() {
    f(1);
}
