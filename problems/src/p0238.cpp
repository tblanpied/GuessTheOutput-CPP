struct S {
    ~S() { throw 1; }
};

int main() {
    S s;
    throw 2;
}
