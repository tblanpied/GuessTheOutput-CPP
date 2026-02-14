void g() noexcept {
    throw 1;
}

int main() {
    g();
}
